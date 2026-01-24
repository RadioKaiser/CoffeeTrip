import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-beige-light">
          <div className="text-center p-8">
            <h1 className="text-4xl font-serif text-espresso-dark mb-4">Что-то пошло не так</h1>
            <p className="text-espresso-medium mb-6">
              Пожалуйста, обновите страницу или попробуйте позже
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gold text-white px-6 py-3 rounded-full hover:bg-terracotta transition-colors"
            >
              Обновить страницу
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
