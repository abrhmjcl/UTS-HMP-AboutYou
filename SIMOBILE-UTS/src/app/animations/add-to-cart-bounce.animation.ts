import { AnimationController } from '@ionic/angular/lazy';

export const addToCartBounceAnimation = (animationCtrl: AnimationController, element: HTMLElement) => {
  const anim = animationCtrl.create()
    .addElement(element)
    .duration(400)
    .iterations(1)
    .keyframes([
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.4, transform: 'scale(1.2)' },
      { offset: 0.7, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' }
    ]);
  
  anim.play();
};