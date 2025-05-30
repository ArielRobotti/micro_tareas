import Types "./types";
import Map "mo:map/Map";
import { phash; nhash } "mo:map/Map";
import Principal "mo:base/Principal";
import { now } "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
actor {

  type User = Types.User;
  type UserUpdatableData = Types.UserUpdatableData;
  type LoginResult = Types.LoginResult;
  type TaskDataInit = Types.TaskDataInit;
  type Task = Types.Task;
  type TaskPreview = Types.TaskPreview;

  stable let users = Map.new<Principal, User>();
  stable let notifications = Map.new<Principal, [Types.Notification]>();
  stable let msgs = Map.new<Principal, [Types.Msg]>();
  stable let activeTasks = Map.new<Nat, Types.Task>();
  stable let archivedTasks = Map.new<Nat, Types.Task>();


  stable var lastTaskId = 0;

  public shared ({ caller }) func signUp({ name : Text }) : async LoginResult {
    if (Principal.isAnonymous(caller)) {
      return #Err("Caller anonymous");
    };
    switch (Map.get<Principal, User>(users, phash, caller)) {
      case null {
        let newUser = { Types.DefaultUser() with name; principal = caller };
        ignore Map.put<Principal, User>(users, phash, caller, newUser);
        return #Ok({
          user = newUser;
          notifications = [];
          msgs = [];
        });
      };
      case (?user) {
        #Ok({
          user;
          notifications = getNotifications(caller);
          msgs = getMsgs(caller);
        });
      };
    };
  };

  public shared query ({ caller }) func singIn() : async LoginResult {
    switch (Map.get<Principal, User>(users, phash, caller)) {
      case null { #Err("User not found") };
      case (?user) {
        #Ok({
          user;
          notifications = getNotifications(caller);
          msgs = getMsgs(caller);
        });
      };
    };
  };

  public shared ({ caller }) func editProfile(data : UserUpdatableData) : async {
    #Ok : User;
    #Err : Text;
  } {
    let user = switch (Map.get<Principal, User>(users, phash, caller)) {
      case null { return #Err("User not found") };
      case (?user) { user };
    };
    let { name; email; avatar } = data;
    let verified = (user.email == email) and (email != null); // En caso de que el usuario modifique su email tendrá que verificarlo nuevamente
    let updatedUser = {
      user with
      verified;
      name = switch (name) { case null user.name; case (?n) n };
      email = switch (email) { case null user.email; case e e };
      avatar = switch (avatar) { case null user.avatar; case a a };
    };
    ignore Map.put<Principal, User>(users, phash, caller, updatedUser);
    #Ok(updatedUser);
  };

  ///////////////// Crud Tareas //////////////////

  public shared ({ caller }) func createTask(data : TaskDataInit) : async {
    #Ok : Nat;
    #Err : Text;
  } {
    assert (not Principal.isAnonymous(caller));
    let user = switch (Map.get<Principal, User>(users, phash, caller)) {
      case null { return #Err("Caller is not User") };
      case (?user) {
        user;
      };
    };

    lastTaskId += 1;
    let newTask : Task = {
      data with
      finalAmount = null;
      id = lastTaskId;
      owner = caller;
      createdAt = now();
      status = #ToDo;
      bids = Map.new<Principal, Types.Offer>();
      assignedTo = null;
    };
    ignore Map.put<Nat, Task>(activeTasks, nhash, lastTaskId, newTask);

    let updatedUser: User = {
      user with
      tasks = Array.tabulate<Nat>(
        user.tasks.size() + 1,
        func(i) { if (i == user.tasks.size()) { lastTaskId } else { user.tasks[i] } }
      )
    };
    ignore Map.put<Principal, User>( users, phash, caller, updatedUser);
    return #Ok(newTask.id);
  };

  public shared query func getPaginateTaskPreview({ page : Nat; qtyPerPage : ?Nat }) : async { arr : [TaskPreview]; hasNext : Bool } {
    let taskArray = Iter.toArray(Map.vals<Nat, Task>(activeTasks));
    let _qtyPerPage = switch (qtyPerPage) { case null 10; case (?n) n };

    if (taskArray.size() >= page * _qtyPerPage) {
      let (deliverySize : Nat, hasNext : Bool) = if (taskArray.size() >= (page + 1) * _qtyPerPage) {
        (_qtyPerPage, taskArray.size() > (page + 1));
      } else { (taskArray.size() % _qtyPerPage, false) };

      let subArray = Array.subArray<Task>(
        taskArray,
        page * _qtyPerPage,
        deliverySize,
      );
      {
        arr = Array.map<Task, TaskPreview>(subArray, func x = { x with bidsCounter = x.bids.size() });
        hasNext;
      };
    } else { { arr = []; hasNext = false } };
  };

  public shared query func expandTask(id : Nat) : async ?Types.TaskExpand {
    Map.get<Nat, Task>(activeTasks, nhash, id);
  };

  public shared ({ caller }) func updateTask({id : Nat; data: Types.UpdatableDataTask}) : async { #Ok; #Err } {
    let task = Map.get<Nat, Task>(activeTasks, nhash, id);
    let {title; description; rewardRange} = data;
    switch task {
      case null { return #Err };
      case (?task) {
        if (task.owner != caller or task.assignedTo != null or task.bids.size() > 0) {
          return #Err;
        };
        let updatedTask: Task = {
          task with
          title;
          description;
          rewardRange
        };
        ignore Map.put<Nat, Task>(activeTasks, nhash, id, updatedTask);
        return #Ok;
      };
    };
  };

  public shared ({ caller }) func deleteTask(id: Nat): async {#Ok; #Err} {
    let task = Map.remove<Nat, Task>(activeTasks, nhash, id);
    switch task {
      case null { return #Err };
      case ( ?t ) {
        if (t.owner != caller or t.assignedTo != null) {
          ignore Map.put<Nat, Task>( activeTasks,  nhash,  id, t );
          #Err 
        } else {
          ignore Map.put<Nat, Task>( archivedTasks,  nhash,  id, t );
          #Ok;
        }
      }
    }
  };

  ////////////////////////////////////////////////////////////

  public shared ({ caller }) func applyForTask({taskId: Nat; amount: Nat}): async {#Ok; #Err: Text}{
    let user = switch(Map.get<Principal, User>(users, phash, caller)){
      case null { return #Err("Caller is not User") };
      case (?user) { user }; 
    };
    if(not user.verified) {
      return #Err("User is not verified")
    };

    let task: Task = switch (Map.get<Nat ,Task>(activeTasks, nhash, taskId)) {
      case null { return #Err("Task does not exist") };
      case (?task) { task };
    };

    if (task.assignedTo != null) { 
      return #Err("Task is already assigned") 
    };

    if (amount < task.rewardRange.0 and task.rewardRange.1 < amount ){
      return #Err("Amount offer is out of range");
    };
    ignore Map.put<Principal, Types.Offer>(task.bids, phash, caller, {date = now(); amount });
    #Ok;
  };


  public shared ({ caller }) func acceptOffer(taskId: Nat, user: Principal): async { #Ok; #Err: Text } {

    let task: Task = switch (Map.get<Nat ,Task>(activeTasks, nhash, taskId)) {
      case null { return #Err("Task does not exist") };
      case (?task) { task };
    };

    if(task.owner != caller ){
      return #Err("Caller is not the task owner");
    };

    let offerAccepted =  Map.get<Principal, Types.Offer>(task.bids, phash, user);
    switch offerAccepted {
      case null { 
        return #Err ("User has not made an offer") 
      };
      case ( ?offer ) {
        let updatedTask: Task = {
          task with
          assignedTo = ?user;
          finalAmount = ?(offer.amount)
        };
        ignore Map.put<Nat, Task>(activeTasks, nhash, taskId, updatedTask);
        return #Ok
      }
    } 
  };


  ///////////// private functions ///////////////

  func getNotifications(p : Principal) : [Types.Notification] {
    switch (Map.get<Principal, [Types.Notification]>(notifications, phash, p)) {
      case null [];
      case (?n) n;
    };
  };

  func getMsgs(p : Principal) : [Types.Msg] {
    switch (Map.get<Principal, [Types.Msg]>(msgs, phash, p)) {
      case null [];
      case (?m) m;
    };
  };
};
