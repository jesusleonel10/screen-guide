const showLoading = (time, setState, boolean) => {
    setTimeout(() => {
        setState(boolean)
      }, time);
}

export default showLoading