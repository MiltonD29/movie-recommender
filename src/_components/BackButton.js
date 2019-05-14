import React from 'react'
import { Link } from 'react-router-dom'

export const BackToHome = () => (
  <Link
    className="button is-rounded"
    to='/'
    role="button"
  >
    <i className="fas fa-chevron-left" style={{marginRight: 6}}></i> Volver
  </Link>
)