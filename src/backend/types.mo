import Principal "mo:base/Principal";
import Map "mo:map/Map";
module {

    type Account = {owner: Principal; subaccount: ?Blob };

    public type User = {
        principal: Principal;
        name: Text;
        avatar: ?Blob;
        email: ?Text;
        verified: Bool;
        score: Nat;
        walletAccount: ?Account;
        tasks: [Nat];
    };

    public type UserUpdatableData = {
        name: ?Text;
        avatar: ?Blob;
        email: ?Text;
    };
    
    public func DefaultUser(): User {
        {
            principal = Principal.fromText("2vxsx-fae");
            name = "";
            avatar = null;
            email = null;
            verified = false;
            score = 0;
            walletAccount = null;
            tasks =  [];
        }
    };

    public type Notification = {
        date: Int;
        title: Text;
        content: Text;
        read: Bool;
    };

    public type Msg = {
        date: Int;
        sender: Principal;
        content: Text;
        read: Bool;
    };

    public type LoginResult = {
        #Ok: (
            {
                user: User; 
                notifications: [Notification];
                msgs: [Msg];
            }
        );
        #Err: Text;
    };

    public type TaskStatus = {
        #ToDo;
        #InProgress;
        #Cancelled;
        #Done;
    };

    public type TaskDataInit = {
        title: Text;
        description: Text;
        kewwords: Text;
        rewardRange: (Nat, Nat);
        assets: [{mimeTypes: Text; data:Blob}];
    };
   
    public type Offer = {
        amount: Nat;
        date: Int;

    };

    public type TaskExpand = TaskDataInit and {
        id: Nat;  
        owner: Principal;
        createdAt: Int;
        status: TaskStatus;
        assignedTo: ?Principal;
    };

    public type TaskPreview = {
        id: Nat;
        owner: Principal;
        title: Text;
        description: Text;
        rewardRange: (Nat, Nat);
        createdAt: Int;
        bidsCounter: Nat;
    };

    public type Task = TaskExpand and {
        bids: Map.Map<Principal, Offer>;
        finalAmount: ?Nat;
    };

    public type UpdatableDataTask = {
        title: Text;
        description: Text;
        rewardRange: (Nat, Nat);
    }

}