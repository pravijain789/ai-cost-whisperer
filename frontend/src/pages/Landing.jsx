import React from 'react';
import Navbar from '../components/Navbar';
import './Landing.css';

const USER_NAME = 'Pravi';

const SplineScene = React.lazy(() => import('@splinetool/react-spline'));

function Landing({ onEnter }) {
  return (
    <div className="landing-page">
      <Navbar onEnter={onEnter} />

      <section className="hero-section">

        {/* ── Spline 3D background ── */}
        <div className="hero-spline-wrap">
          <React.Suspense fallback={<div className="spline-fallback" />}>
            <SplineScene
              scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            />
          </React.Suspense>
        </div>

        {/* ── Dark overlay ── */}
        <div className="hero-overlay" />

        {/* ── Content — anchored bottom-left ── */}
        <div className="hero-content">

          <p className="hero-welcome anim-fade-up" style={{ animationDelay: '0.1s' }}>
            Welcome back, {USER_NAME} 👋
          </p>

          <p className="hero-quote anim-fade-up" style={{ animationDelay: '0.18s' }}>
            "Every dollar saved begins with understanding where it goes."
          </p>

          <h1 className="hero-heading anim-fade-up" style={{ animationDelay: '0.28s' }}>
            CLOUD COST<br />
            <span className="heading-accent">WHISPERER</span>
          </h1>

          <p className="hero-sub anim-fade-up" style={{ animationDelay: '0.42s' }}>
            Understand your AWS bill instantly.
          </p>

          <p className="hero-desc anim-fade-up" style={{ animationDelay: '0.56s' }}>
            Real-time AWS cost tracking powered by AI. Get plain-English
            explanations of every charge, intelligent savings recommendations,
            and automated monitoring — all in one dashboard.
          </p>

          <div className="hero-buttons anim-fade-up" style={{ animationDelay: '0.7s' }}>
            <button className="btn-primary" onClick={onEnter}>
              View Dashboard
            </button>
            <button className="btn-white" onClick={onEnter}>
              See How It Works
            </button>
          </div>

          <p className="hero-trust anim-fade-up" style={{ animationDelay: '0.85s' }}>
            Powered by AWS Cost Explorer &middot; AI-driven insights &middot; Real-time monitoring
          </p>

        </div>
      </section>
    </div>
  );
}

export default Landing;
