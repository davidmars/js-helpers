/**
 * Retourne la position relative de la souris par rapport à un élément
 * @param container
 * @param mouseEvent
 */
export function mouseRelativePosition(
  container:HTMLElement,
  mouseEvent:MouseEvent|PointerEvent):{x:number,y:number}{
  const rect = container.getBoundingClientRect();
  const x = mouseEvent.clientX - rect.left;
  const y = mouseEvent.clientY - rect.top;
  return {x:x,y:y};

}
