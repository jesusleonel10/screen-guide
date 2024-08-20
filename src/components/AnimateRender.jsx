import { Children, useState, useEffect, cloneElement } from "react";

import "./../scss/AnimateRender.scss";

export default function AnimatedRender({
  children,
  mountAnimationClass = "animated-render-show",
  unmountAnimationClass = "animated-render-hide",
  visible = true
}) {
  const [show, setShow] = useState(visible);

  const animatedClassName = visible
    ? mountAnimationClass
    : unmountAnimationClass;

  useEffect(() => {
    if (visible) {
      setShow(true);
    }
  }, [visible]);

  const handleAnimationEnd = () => {
    if (!visible) {
      setShow(false);
    }
  };

  const clonedChildren = Children.map(children, (child) => {
    const classNameWithAnimate = `${
      child.props.className || ""
    } ${animatedClassName}`;
    return cloneElement(child, {
      className: classNameWithAnimate,
      onAnimationEnd: handleAnimationEnd
    });
  });

  return show && clonedChildren;
}
