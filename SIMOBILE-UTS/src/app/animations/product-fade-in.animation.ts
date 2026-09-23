import { AnimationController } from '@ionic/angular/lazy';

export const fadeInProductsAnimation = (animationCtrl: AnimationController) => {
  const cards = document.querySelectorAll('.product-card');
  
  if (!cards || cards.length === 0) return;

  cards.forEach((card, index) => {
    const anim = animationCtrl.create()
      .addElement(card as HTMLElement)
      .duration(500)
      .delay(index * 100)
      .iterations(1)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateY(20px)' },
        { offset: 1, opacity: '1', transform: 'translateY(0)' }
      ]);
    
    anim.play();
  });
};