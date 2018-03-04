const defaultTransform = `translate3d(0px,0px,0px)`;
export function getDefault() {
  return {
    box: {
      height: `66px`
    },
    content: {
      width: "100%"
    },
    process: {
      width: `100%`,
      transform: `translate3d(0px,0px,0px)`
    },
    cover: {
      borderRadius: `0%`,
      boxShadow: `0px 1px 2px rgba(0,0,0,.1)`
    },
    texts: {
      transform: defaultTransform
    },
    control: {
      transform: defaultTransform
    },
    right: {
      transform: defaultTransform
    }
  };
}
export function getTrans(offsetWidth, offsetHeight) {
  return {
    box: {
      height: `100%`,
      background: "#fcfcfc"
    },
    content: {
      width: "1200px",
      height: "100%"
    },
    process: {
      width: `346px`,
      transform: `translate3d(${offsetWidth + 262}px,-${offsetHeight -
        53}px,0px)`
    },
    cover: {
      borderRadius: `50%`,
      width: "240px",
      height: "240px",
      marginBottom: "50px"
    },
    texts: {
      transform: "translate3d(44px,56px,0px)",
      fontSize: `22px`,
      lineHeight: `1em`,
      maxWidth: "250px"
    },
    control: {
      transform: `translate3d(-133px,50px,0px)`
    },
    right: {
      transform: "translate3d(-547px,-60px,0px)"
    }
  };
}
