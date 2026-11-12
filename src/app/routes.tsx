import { createBrowserRouter } from 'react-router'
import { PortfolioHome } from '../App'
import { ServicePage } from '../pages/ServicePage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PortfolioHome,
  },
  {
    path: '/services/:serviceSlug',
    Component: ServicePage,
  },
  {
    path: '*',
    Component: PortfolioHome,
  },
])
