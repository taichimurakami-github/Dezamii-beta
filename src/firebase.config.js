const firebaseConfig = {
  apiKey: "AIzaSyCI1PY_eRbAnjRVTdRSpzgS4psJKeFXOOo",
  authDomain: "gls-conneqt-hey-demo002.firebaseapp.com",
  projectId: "gls-conneqt-hey-demo002",
  storageBucket: "gls-conneqt-hey-demo002.appspot.com",
  messagingSenderId: "685488696857",
  appId: "1:685488696857:web:cec235e5c4056f4dd24488",
};

const firestoreQueryConfig = {
  array_contains_any: {
    max_length: 10,
  },
};

const db_name = {
  user: "users",
  chatRoom: "chatRoom",
};

const userDocTemplate = {
  uid: "",
  name: "",
  age: "",
  email: "",
  photo: "",
  hometown: {
    prefecture: "",
    city: "",
  },
  history: {
    university: "",
  },
  profile: "",
  location: {
    lat: "",
    lng: "",
  },
  friend: {},
  request: {
    received: [],
    sent: [],
    rejected: [],
  },

  meta: [], //firestoreでOR検索するための苦肉の策として入れる。
};

export { firebaseConfig, firestoreQueryConfig, userDocTemplate, db_name };
