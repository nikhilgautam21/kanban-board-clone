const LocalStorageManager = {
  saveViewState: (viewState) => {
    localStorage.setItem("viewState", JSON.stringify(viewState));
  },
  getSavedViewState: () => {
    const viewState = localStorage.getItem("viewState");
    return viewState ? JSON.parse(viewState) : null;
  },
};

export default LocalStorageManager;
