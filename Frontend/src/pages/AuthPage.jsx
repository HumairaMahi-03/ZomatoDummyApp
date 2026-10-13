import { Link } from 'react-router-dom'

const pageContent = {
  user: {
    label: 'For food lovers',
    name: 'Zomato',
    registerTitle: 'Find your next favourite',
    loginTitle: 'Welcome back',
    registerDescription: 'Create an account and discover places you will love.',
    loginDescription: 'Sign in to continue your delicious journey.',
  },
  partner: {
    label: 'For food partners',
    name: 'Partner with Zomato',
    registerTitle: 'Grow your food business',
    loginTitle: 'Welcome back, partner',
    registerDescription: 'Join a community that helps your restaurant reach more people.',
    loginDescription: 'Manage your restaurant and connect with hungry customers.',
  },
}

function AuthPage({ audience, mode }) {
  const content = pageContent[audience]
  const isRegister = mode === 'register'
  const loginPath = audience === 'user' ? '/user/login' : '/food-partner/login'
  const registerPath = audience === 'user' ? '/user/register' : '/food-partner/register'

  return (
    <main className="auth-shell">
      <section className="auth-brand-panel" aria-label="Zomato introduction">
        <Link className="brand-mark" to={isRegister ? registerPath : loginPath}>
          <span className="brand-mark__dot" aria-hidden="true" />
          <span>zomato</span>
        </Link>

        <div className="brand-message">
          <p className="eyebrow">{content.label}</p>
          <h1>{isRegister ? 'Good food is always a good idea.' : 'Your table is waiting.'}</h1>
          <p>Simple experiences. Great food. Made for every craving.</p>
        </div>

        <span className="brand-footer">© 2025 Zomato</span>
      </section>

      <section className="auth-content">
        <div className="auth-card">
          <div className="auth-card__header">
            <p className="auth-card__label">{content.name}</p>
            <h2>{isRegister ? content.registerTitle : content.loginTitle}</h2>
            <p>{isRegister ? content.registerDescription : content.loginDescription}</p>
          </div>

          <form className="auth-form">
            {isRegister && (
              <label className="field">
                <span>Full name</span>
                <input type="text" name="name" placeholder="Your name" autoComplete="name" />
              </label>
            )}

            {audience === 'partner' && isRegister && (
              <label className="field">
                <span>Restaurant name</span>
                <input type="text" name="restaurant" placeholder="Your restaurant" autoComplete="organization" />
              </label>
            )}

            <label className="field">
              <span>Email address</span>
              <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
            </label>

            {isRegister && (
              <label className="checkbox-field">
                <input type="checkbox" name="terms" />
                <span>I agree to the terms and privacy policy.</span>
              </label>
            )}

            <button className="auth-submit" type="submit">
              {isRegister ? 'Create account' : 'Sign in'}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? 'Already have an account?' : 'New to Zomato?'}{' '}
            <Link to={isRegister ? loginPath : registerPath}>
              {isRegister ? 'Sign in' : 'Create an account'}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default AuthPage
