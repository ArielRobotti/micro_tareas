import Principal "mo:base/Principal";

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
        #Done;
    };
   
    public type Task = {
        id: Nat;
        owner: Principal;
        createdAt: Int;
        title: Text;
        desciption: Text;
        status: TaskStatus;
        asignedTo: ?Principal;
        reward: Nat;
    }
}