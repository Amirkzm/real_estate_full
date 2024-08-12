import React, { Component } from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import "./errorBoundary.scss";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: any;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary">
          <div className="left">
            <h1>Something went wrong.</h1>
            <p>{this.state.error?.message || "Unknown Error"}</p>
            <Link to="/">
              <Button>Go to Home</Button>
            </Link>
          </div>
          <div className="right">
            <img src="/error.jpg" alt="Error" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
