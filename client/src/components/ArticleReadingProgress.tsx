import { useEffect, useState } from "react";

export function calculateArticleReadingProgress(articleTop: number, articleHeight: number, viewportHeight: number, scrollY: number): number {
  const readableDistance = Math.max(1, articleHeight - viewportHeight * 0.55);
  const percentage = ((scrollY - articleTop) / readableDistance) * 100;
  return Math.min(100, Math.max(0, Math.round(percentage)));
}

const styles = `
  .article-reading-progress { position:fixed; inset:0 0 auto; z-index:90; height:4px; pointer-events:none; background:rgba(255,253,248,.72); opacity:0; transition:opacity 160ms var(--ease-out); }
  .article-reading-progress.is-visible { opacity:1; }
  .article-reading-progress-fill { width:var(--article-reading-progress,0%); height:100%; background:var(--green); box-shadow:0 1px 8px rgba(23,107,91,.28); transition:width 130ms var(--ease-out); }
  @media (prefers-reduced-motion:reduce) { .article-reading-progress,.article-reading-progress-fill { transition:none; } }
`;

export default function ArticleReadingProgress({ articleId }: { articleId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.getElementById(articleId);
      if (!article) return;
      const top = article.getBoundingClientRect().top + window.scrollY;
      setProgress(calculateArticleReadingProgress(top, article.offsetHeight, window.innerHeight, window.scrollY));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [articleId]);

  return <div className={`article-reading-progress${progress > 0 ? " is-visible" : ""}`} role="progressbar" aria-label="Article reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={`${progress}% of the article read`}><style>{styles}</style><div className="article-reading-progress-fill" style={{ "--article-reading-progress": `${progress}%` } as React.CSSProperties} /></div>;
}
