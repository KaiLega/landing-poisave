// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import SharePinPage from './SharePinPage'

afterEach(cleanup)

describe('SharePinPage', () => {
  it('renders the shared POI without adding unsupported content', () => {
    render(<SharePinPage search="?title=Resort%20Mabul&categoryId=resort&lat=4.22&lng=118.68&city=Malaysia&address=Semporna&price=%E2%82%AC120&description=hidden&url=https%3A%2F%2Fexample.com" />)

    expect(screen.getByRole('heading', { name: 'Resort Mabul' })).toBeInTheDocument()
    expect(screen.getByText('Resort')).toBeInTheDocument()
    expect(screen.getByText('Semporna')).toBeInTheDocument()
    expect(screen.getByText('€120')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Apri in PoiSave/i })).toHaveAttribute('href', expect.stringContaining('poisave://pin?'))
    expect(screen.queryByText('hidden')).not.toBeInTheDocument()
    expect(screen.queryByText('https://example.com')).not.toBeInTheDocument()
  })

  it('renders a safe fallback for invalid coordinates', () => {
    render(<SharePinPage search="?title=Resort&categoryId=resort&lat=999&lng=118.68" />)

    expect(screen.getByRole('heading', { name: 'Non riusciamo ad aprire questo luogo' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Apri in PoiSave/i })).not.toBeInTheDocument()
  })

  it('escapes untrusted text through React rendering', () => {
    render(<SharePinPage search="?title=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E&categoryId=resort&lat=4.22&lng=118.68" />)

    expect(screen.getByRole('heading')).toHaveTextContent('<img src=x onerror=alert(1)>')
    expect(document.querySelector('img[src="x"]')).not.toBeInTheDocument()
  })
})
