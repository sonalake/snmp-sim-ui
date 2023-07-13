import { Component, ReactNode } from 'react';
import { HiRefresh } from 'react-icons/hi';
import { Button } from 'flowbite-react';

import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { PageWrapper, StatusDisplay } from '..';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true };
  }

  public componentDidCatch(error: Error) {
    this.setState({ error });
  }

  public render() {
    if (this.state.hasError && this.state.error?.message) {
      return (
        <PageWrapper>
          <StatusDisplay
            icon='error'
            title='Error'
            subTitle={this.state.error.message}
            extraContent={
              <Button onClick={() => window.location.reload()}>
                <ButtonIcon as={HiRefresh} />
                Refresh
              </Button>
            }
          />
        </PageWrapper>
      );
    }

    return this.props.children;
  }
}
