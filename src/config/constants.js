export const CONSENT_FORM = {
  HEADING: "Non-Gambling Territories.",
  BODY1: `Connecting to our site from non gambling countries, it will be User's responsibility to ensure that their use of the service is lawful.`,
  BODY2: "Underage gambling is prohibited.",
  FOOTER: "Please confirm if you are 18 years old and above as of today.",
  CONFIRM_LABEL: "Confirm",
  EXIT_LABEL: "Exit",
};

export const VALIDATIONS = {
  UPSTRING: /[^a-zA-Z]/g,
  ALPHANUM: /[^a-zA-Z0-9]/g,
  DIGIT: /[^0-9]/g,
  EMAIL: /[^0-9a-zA-Z@._-]/g,
  ALPHANUMWITHSPACE: /[^a-zA-Z0-9 ]/g,
};

export const COMMON_LABELS = {
  HOME: "HOME",
  GAME: "GAME",
  MINE: "MINE",
  UNDEFINED: "Undefined",
  LOGIN: "Login",
  BALANCE: "Balance",
  ID: "ID: ",
  RUPEE_SYMBOL: "₹",
  CONTRACT_MONEY: "Contract Money",
  NUMBER: "Number",
  TOTAL_CONTRACT: "Total contract money is",
  CONFIRM: "I GOT IT",
  USER_WON: "WIN",
  USER_LOSS: "LOSS",
  GAME_RESULT: "RESULT",
  PERIOD: "Period",
  USER: "User",
  SELECT: "Select",
  POINT: "Point",
  AMOUNT: "Amount",
  CLOSE: "CLOSE",
  EVERY0NE_ORDER: `Everyone's Order`,
  MY_ORDER: "My Order",
  COUNT_DOWN: "Count Down",
  ZERO: "0",
  SEMICOLON: ":",
  RATIO_HALF: "1:2",
  RATIO_TIE: "1:3",
  RECORD: "Record",
  RESULT: "Result",
};

export const MINE_LABELS = {
  MOBILE: "Mob: ",
  ID: ", ID: ",
  ORDER_RECORD: "Order Record",
  FIN_DETAILS: "Financial Details",
  DOWNLOAD: "Download",
  FOLLOW_US: "Follow us",
  SUPPORT: "Support",
  COMPLAINTS: "Complaints",
  SIGN_OUT: "Sign Out",
  RECORD: "Record",
  ACTIVITY_LOG: "Activity Log",
  PASSWORD_HISTORY: "Change Password History",
};

export const ANDAR_BAHAR_LABELS = {
  GAME: "Andar Bahar",
  ORDER_ANDAR: "Andar",
  ORDER_BAHAR: "Bahar",
  ORDER_TIE: "Tie",
  JOIN_ANDAR: "Join Andar",
  JOIN_BAHAR: "Join Bahar",
  JOIN_TIE: "Join Tie",
  RECORDS: "Andar Bahar Record(s)",
};

export const recordsScreenSize = {
  minwidth0: `(min-width: 0px)`,
  minWidth320: `(min-width: 320px)`,
  minWidth340: `(min-width: 340px)`,
  minWidth360: `(min-width: 360px)`,
  minWidth380: `(min-width: 380px)`,
  minWidth400: `(min-width: 400px)`,
  minWidth420: `(min-width: 420px)`,
};

export const DRAGON_TIGER_LABELS = {
  GAME: "Dragon Tiger",
  ORDER_TIGER: "Tiger",
  ORDER_DRAGOAN: "Dragon",
  ORDER_TIE: "Tie",
  JOIN_TIGER: "Join Tiger",
  JOIN_DRAGON: "Join Dragon",
  JOIN_TIE: "Join Tie",
  RECORDS: "Dragon Tiger Record(s)",
};

export const ORDER_LABELS = {
  TITLE: "Order",
};

export const ORDER_HISTORY_TABS = [
  { id: "dragontiger", label: "Dragon Tiger" },
  { id: "andarbahar", label: "Andar Bahar" },
  { id: "luckyseven", label: "Lucky Seven" },
];

export const LUCKY_SEVEN_LABELS = {
  GAME: "Lucky Seven",
  ORDER_UP: "Up",
  ORDER_DOWN: "Down",
  ORDER_TIE: "Tie",
  JOIN_UP: "Join Up",
  JOIN_DOWN: "Join Down",
  JOIN_TIE: "Join Tie",
  RECORDS: "Lucky Seven Record(s)",
};

export const ORDER_TABS_TYPES = {
  EVERYONE: "Everyone",
  MINE: "Mine",
};

export const ERROR_MESSAGES = {
  NEW_GAME: "Login to play games!!!",
  LOW_BALANCE: '"Balance is too low!!!',
  MINIMUM_BET:
    "Minimum betting amount is " + COMMON_LABELS.RUPEE_SYMBOL + "100",
  WRONG: "Something went wrong",
};

export const FIN_DETAILS_LABELS = {
  TITLE: "Transactions",
};

export const ACTIVITY_LOGS_LABELS = {
  TITLE: "Activity Log",
};

export const PASSWORD_HISTORY_LABELS = {
  TITLE: "Change Password History",
};
