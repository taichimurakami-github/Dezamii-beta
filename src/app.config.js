export const appConfig = {
  AppMode: {
    "000": "PRODUCTION",
    "001": "DEVELOPMENT",
    "002": "DEV_TEST",
  },
  initialState: {
    App: {
      modalState: {
        display: false,
        type: null,
        closeable: false,
        content: null
      }
    }
  },
  components: {
    modal: {
      type: {
        "001": "LOADING",
        "002": "CONFIRM",
        "003": "ERROR",
      }
    },
  },
  pageContents: {
    "001": "NOT_SIGNED_IN",
    "002": "FIND_USERS",
    "003": "CHAT",
    "004": "MY_PAGE",
  }
}