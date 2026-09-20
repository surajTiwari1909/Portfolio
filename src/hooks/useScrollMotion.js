import { useEffect, useRef } from 'react';

const revealTargets = [
  '.projects-section .section-heading',
  '.project-toolbar',
  '.project-card',
  '.about-photo',
  '.about-copy',
  '.terminal-intro',
  '.portfolio-terminal',
  '.experience-section .section-heading',
  '.experience-row',
  '.education',
  '.skills-section > div:first-child',
  '.skill-item',
  '.contact-inner',
].join(', ');

export default function useScrollMotion(projectFilter) {
  const progressRef = useRef(null);
  const revealed = useRef(new WeakSet());

  useEffect(() => {
    let frame = 0;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const portrait = document.querySelector('.about-photo');
    const rows = Array.from(document.querySelectorAll('.experience-row'));
    const headings = Array.from(document.querySelectorAll(
      '.section-heading h2, .about-copy h2, .terminal-intro h2, .skills-section h2'
    ));
    headings.forEach(heading => heading.classList.add('scroll-accent-heading'));
    const clamp = value => Math.min(1, Math.max(0, value));
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      // Batch geometry reads before writes to avoid layout thrashing on scroll.
      const viewport = window.innerHeight;
      const portraitBounds = portrait?.getBoundingClientRect();
      const rowBounds = rows.map(row => row.getBoundingClientRect());
      const headingBounds = headings.map(heading => heading.getBoundingClientRect());
      const reduce = preference.matches;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      if (portraitBounds) {
        const travel = clamp((viewport - portraitBounds.top) / (viewport + portraitBounds.height));
        portrait.style.setProperty('--portrait-shift', `${reduce ? 0 : (travel - .5) * 18}px`);
      }
      rows.forEach((row, index) => {
        const bounds = rowBounds[index];
        const fill = reduce ? 1 : clamp((viewport * .65 - bounds.top) / Math.max(1, bounds.height));
        row.style.setProperty('--journey-progress', fill.toFixed(3));
        row.dataset.journeyReached = String(reduce || bounds.top < viewport * .65);
      });
      headings.forEach((heading, index) => {
        const fill = reduce ? 1 : clamp((viewport * .92 - headingBounds[index].top) / (viewport * .35));
        heading.style.setProperty('--heading-progress', fill.toFixed(3));
      });
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    preference.addEventListener('change', scheduleUpdate);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : null;
    observer?.observe(document.body);
    updateProgress();
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      preference.removeEventListener('change', scheduleUpdate);
      headings.forEach(heading => {
        heading.classList.remove('scroll-accent-heading');
        heading.style.removeProperty('--heading-progress');
      });
      rows.forEach(row => {
        row.style.removeProperty('--journey-progress');
        delete row.dataset.journeyReached;
      });
      portrait?.style.removeProperty('--portrait-shift');
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // Content is visible by default. Animate on entry without hiding links or
    // interfering with keyboard focus, browser search, and anchor navigation.
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set();
    const targets = document.querySelectorAll(revealTargets);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        observer.unobserve(element);
        if (revealed.current.has(element)) return;
        revealed.current.add(element);
        if (preference.matches || element.contains(document.activeElement)) return;

        const staggered = element.matches('.project-card, .skill-item');
        const siblings = staggered ? Array.from(element.parentElement.children) : [];
        const delay = staggered ? (siblings.indexOf(element) % 3) * 85 : 0;
        const animation = element.animate([
          { opacity: 0, translate: '0 24px' },
          { opacity: 1, translate: '0 0' },
        ], {
          duration: 650,
          delay,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'backwards',
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });

    targets.forEach(element => {
      if (!revealed.current.has(element)) observer.observe(element);
    });
    const stopAnimations = () => {
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const handlePreference = () => {
      if (preference.matches) stopAnimations();
    };
    // A keyboard user should never land on a fading or delayed control.
    const handleFocus = event => {
      animations.forEach(animation => {
        if (animation.effect?.target?.contains(event.target)) {
          animation.cancel();
          animations.delete(animation);
        }
      });
    };
    preference.addEventListener('change', handlePreference);
    document.addEventListener('focusin', handleFocus);
    return () => {
      observer.disconnect();
      stopAnimations();
      preference.removeEventListener('change', handlePreference);
      document.removeEventListener('focusin', handleFocus);
    };
  }, [projectFilter]);

  return progressRef;
}
