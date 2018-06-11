import { TweenMax } from 'gsap';

export default {
    open (target, duration) {
        TweenMax.from(target, duration, {
            opacity: 0,
            height:  0,
            scale:   0,
        });
    },
    close (target, duration) {
        TweenMax.to(target, duration, {
            opacity: 0,
            height:  0,
            scale:   0,
        });
    },
};
