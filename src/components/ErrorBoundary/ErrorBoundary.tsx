import { Button } from 'flowbite-react'
import React, { Component, ReactNode } from 'react'
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

  public componentDidCatch(error: Error) {
    this.setState({ error })
  }

  public render() {
    if (this.state.hasError && this.state.error?.message) {
      return (
        <PageWrapper>
          <div className="flex flex-col items-center">
            <AiFillCloseCircle className="w-24 h-24 mt-48 mb-2 text-red-600" />

            <h1 className="text-2xl mb-5">Error</h1>

            <h4 className="text-base mb-10">{this.state.error.message}</h4>

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
