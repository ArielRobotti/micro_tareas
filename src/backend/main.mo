import Types "./types";
import Map "mo:map/Map";
import { phash } "mo:map/Map";
import Principal "mo:base/Principal";

actor {

  type User = Types.User;
  type UserUpdatableData = Types.UserUpdatableData;
  type LoginResult = Types.LoginResult;

  stable let users = Map.new<Principal, User>();
  stable let notifications = Map.new<Principal, [Types.Notification]>();
  stable let msgs = Map.new<Principal, [Types.Msg]>();

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

  public shared ({ caller }) func editProfile(data : UserUpdatableData) : async LoginResult {
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
    #Ok({
      user = updatedUser;
      notifications = getNotifications(caller);
      msgs = getMsgs(caller);
    });
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
