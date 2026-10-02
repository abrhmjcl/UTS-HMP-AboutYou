import { AnimationController } from '@ionic/angular/lazy';

export const fadeInProductsAnimation = (animationCtrl: AnimationController) => {
  const cards = document.querySelectorAll('.product-card');
  
  if (!cards || cards.length === 0) return;

  cards.forEach((card, index) => {
    const anim = animationCtrl.create()
      .addElement(card as HTMLElement)
      .duration(500)
<<<<<<< HEAD
      .delay(index * 100)
=======
      .delay(index * 100) // Stagger effect
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
      .iterations(1)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateY(20px)' },
        { offset: 1, opacity: '1', transform: 'translateY(0)' }
      ]);
    
    anim.play();
  });
<<<<<<< HEAD
};
=======
};
>>>>>>> ba3dc42c7da461b14181b70dcc15d3b7d6e20f2c
