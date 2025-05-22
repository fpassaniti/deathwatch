<script>
  // Home page component
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="homepage">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-background">
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-container">
      <div class="hero-content">
        <h1>Stay Connected with Those Who Matter</h1>
        <p class="hero-description">
          Receive timely notifications about the passing of loved ones, ensuring you
          never miss an opportunity to pay your respects and offer support.
        </p>
        <div class="hero-buttons">
          <a href="/auth/register" class="btn large">Sign Up</a>
          <a href="/auth/login" class="btn secondary large">Log In</a>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2>How It Works</h2>
        <p class="section-description">
          Our service simplifies the process of staying informed about important life events,
          ensuring you can be there for those who need you most.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5H12.6C11.68 5 10.76 5.06 9.83 5.17L12.5 2.5L11 1L5 7V9C5 10.66 6.34 12 8 12V22H16V12C17.66 12 19 10.66 19 9H21Z" fill="currentColor"/>
            </svg>
          </div>
          <h3>Instant Notifications</h3>
          <p>Receive immediate alerts about the passing of friends, family, and colleagues, allowing you to respond promptly.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4ZM8 13C10.67 13 16 14.33 16 17V20H0V17C0 14.33 5.33 13 8 13ZM16 13C16.76 13 17.47 13.09 18.09 13.25C19.42 14.14 20 15.13 20 17V20H18V17C18 15.9 17.69 14.9 16.99 14.01C16.68 13.06 16.35 13 16 13Z" fill="currentColor"/>
            </svg>
          </div>
          <h3>Community Support</h3>
          <p>Connect with others who share your loss, offering and receiving comfort during difficult times.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z" fill="currentColor"/>
            </svg>
          </div>
          <h3>Privacy First</h3>
          <p>Your information is kept confidential, ensuring notifications are sent only to verified contacts.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Commitment Section -->
  <section class="section commitment-section">
    <div class="container">
      <div class="section-header">
        <h2>Our Commitment</h2>
        <p class="section-description">
          We are dedicated to providing a respectful and reliable platform for sharing
          important life events, ensuring you can stay connected with your community.
        </p>
      </div>

      <div class="commitment-grid">
        <div class="commitment-card">
          <div class="commitment-image respect"></div>
          <div class="commitment-content">
            <h3>Respectful Communication</h3>
            <p>Notifications are delivered with sensitivity and respect, honoring the memory of those who have passed.</p>
          </div>
        </div>

        <div class="commitment-card">
          <div class="commitment-image reliable"></div>
          <div class="commitment-content">
            <h3>Reliable Updates</h3>
            <p>Stay informed with accurate and timely updates, ensuring you never miss an important event.</p>
          </div>
        </div>

        <div class="commitment-card">
          <div class="commitment-image community"></div>
          <div class="commitment-content">
            <h3>Community Focus</h3>
            <p>Connect with others who share your loss, offering and receiving comfort during difficult times.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>Join Our Community</h2>
        <p>Sign up today to start receiving notifications and stay connected with those who matter most.</p>
        <a href="/auth/register" class="btn large">Get Started</a>
      </div>
    </div>
  </section>
</div>

<style>
  .homepage {
    min-height: 100vh;
  }

  /* Hero Section */
  .hero {
    position: relative;
    height: 480px;
    display: flex;
    align-items: center;
    color: var(--color-text-light);
    overflow: hidden;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    z-index: 1;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-hero);
    z-index: 2;
  }

  .hero-container {
    position: relative;
    z-index: 3;
    width: 100%;
  }

  .hero-content {
    max-width: 896px;
    margin: 0 auto;
    text-align: center;
    padding: 0 var(--spacing-lg);
  }

  .hero h1 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
    letter-spacing: -0.04em;
  }

  .hero-description {
    font-size: 1rem;
    margin-bottom: var(--spacing-3xl);
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    flex-wrap: wrap;
  }

  /* Sections */
  .section {
    padding: var(--spacing-6xl) 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-5xl);
  }

  .section-header h2 {
    font-size: 2.25rem;
    font-weight: 900;
    margin-bottom: var(--spacing-lg);
    letter-spacing: -0.025em;
  }

  .section-description {
    font-size: 1rem;
    color: var(--color-text-secondary);
    max-width: var(--content-width);
    margin: 0 auto;
  }

  /* Features Grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background: var(--color-bg-0);
    border: 1px solid var(--color-border-light);
    border-radius: var(--border-radius);
    padding: var(--spacing-lg);
    text-align: left;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    width: 24px;
    height: 24px;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }

  .feature-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: var(--spacing-xs);
  }

  .feature-card p {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin: 0;
  }

  /* Commitment Section */
  .commitment-section {
    background-color: var(--color-bg-1);
  }

  .commitment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
  }

  .commitment-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .commitment-image {
    height: 169px;
    border-radius: var(--border-radius);
    background-size: cover;
    background-position: center;
  }

  .commitment-image.respect {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .commitment-image.reliable {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .commitment-image.community {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  .commitment-content h3 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: var(--spacing-xs);
  }

  .commitment-content p {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin: 0;
  }

  /* CTA Section */
  .cta-section {
    padding: var(--spacing-6xl) 0;
    text-align: center;
  }

  .cta-content h2 {
    font-size: 2.25rem;
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
    letter-spacing: -0.025em;
  }

  .cta-content p {
    font-size: 1rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-3xl);
    max-width: var(--content-width);
    margin-left: auto;
    margin-right: auto;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }

    .hero-description {
      font-size: 0.875rem;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }

    .hero-buttons .btn {
      min-width: 200px;
    }

    .section-header h2 {
      font-size: 1.875rem;
    }

    .cta-content h2 {
      font-size: 1.875rem;
    }

    .commitment-card {
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .hero {
      height: 400px;
    }

    .hero h1 {
      font-size: 1.75rem;
    }

    .section {
      padding: var(--spacing-4xl) 0;
    }
  }
</style>