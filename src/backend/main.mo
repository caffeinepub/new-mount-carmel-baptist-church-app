import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type MemberProfile = {
    createdAt : Time.Time;
    displayName : ?Text;
  };

  let memberProfiles = Map.empty<Principal, MemberProfile>();

  public shared ({ caller }) func upsertMyProfile(displayName : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update their profile.");
    };
    let now = Time.now();
    let memberProfile : MemberProfile = {
      createdAt = now;
      displayName;
    };
    memberProfiles.add(caller, memberProfile);
  };

  public query ({ caller }) func getMyProfile() : async ?MemberProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view their profile.");
    };
    memberProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?MemberProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile unless you are an admin.");
    };
    memberProfiles.get(user);
  };

  public type Livestream = {
    embedCode : Text;
    updatedAt : Time.Time;
  };

  public type LivestreamType = {
    #YouTube;
    #Facebook;
    #Other;
  };

  let livestreams = Map.empty<Text, Livestream>();

  public shared ({ caller }) func saveLivestream(livestreamType : LivestreamType, embedCode : Text) : async () {
    func typeToText(lt : LivestreamType) : Text {
      switch (lt) {
        case (#YouTube) { "YouTube" };
        case (#Facebook) { "Facebook" };
        case (#Other) { "Other" };
      };
    };

    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users (admins/members) can save livestreams.");
    };

    let livestream : Livestream = {
      embedCode;
      updatedAt = Time.now();
    };
    livestreams.add(typeToText(livestreamType), livestream);
  };

  public query func getLivestream(livestreamType : LivestreamType) : async ?Livestream {
    let key = switch (livestreamType) {
      case (#YouTube) { "YouTube" };
      case (#Facebook) { "Facebook" };
      case (#Other) { "Other" };
    };
    livestreams.get(key);
  };
};
