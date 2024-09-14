import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "src/components/loading/loading";
import { Spinner } from "src/components/loading/spinner";
import { Notification } from "src/components/notification/notification";

// import { Button, Spinner } from '@/components/Elements';
// import { Notifications } from '@/components/Notifications/Notifications';
// import { AuthLoader } from '@/lib/auth';
import { AuthLoader } from "src/lib/auth";
import { queryClient } from "src/lib/react-query";

const ErrorFallback = () => {
  return (
    <div>
      <h2>Ooops, something went wrong :( </h2>
      {/* <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button> */}
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="bg-gray-50 dark:bg-gray-900 h-screen w-screen">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Loading />
            <Notification />
            <AuthLoader
              renderLoading={() => (
                <div>
                  <Spinner />
                </div>
              )}
            >
              <Router>{children}</Router>
            </AuthLoader>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
