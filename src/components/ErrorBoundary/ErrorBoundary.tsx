import { Button } from 'flowbite-react'
import React, { Component, ReactNode } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
import { PageWrapper, StatusDisplay } from '..'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true }
  }

  public componentDidCatch(error: Error) {
    this.setState({ error })
  }

  public render() {
    if (this.state.hasError && this.state.error?.message) {
      return (
        <PageWrapper>
          <StatusDisplay
            icon="error"
            title="Error"
            subTitle={this.state.error.message}
            extraContent={
              <Button onClick={() => window.location.reload()}>
                <AiOutlineReload className="mr-2 h-5 w-5" />
                Refresh
              </Button>
            }
          />
        </PageWrapper>
      )
    }

    return this.props.children
  }
}
