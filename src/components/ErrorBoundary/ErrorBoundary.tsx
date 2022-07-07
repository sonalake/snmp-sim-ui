import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from 'flowbite-react'
import { AiFillCloseCircle, AiOutlineReload } from 'react-icons/ai'
import { PageWrapper } from '..'

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

  public static getDerivedStateFromError(_: Error): State {
    return { error: null, hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ error })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <PageWrapper>
          <div className="w-full h-full m-auto flex flex-col items-center justify-center">
            <AiFillCloseCircle className="mb-2 h-10 w-10 text-red-600" />

            <h1>Error</h1>

            <h4>{this.state.error?.message}</h4>

            <Button onClick={() => window.location.reload()}>
              <AiOutlineReload className="mr-2 h-5 w-5" />
              Refresh
            </Button>
          </div>
        </PageWrapper>
      )
    }

    return this.props.children
  }
}
