import React, { useEffect, useState } from 'react'
import getUserInfo from '../utilities/decodeJwt'
import Container from 'react-bootstrap/Container'

// Here, we display our Navbar
export default function Dropdown() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled:
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <div class='dropdown show'>
      <a
        class='btn btn-secondary dropdown-toggle'
        href='#'
        role='button'
        id='dropdownMenuLink'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        Dropdown link
      </a>

      <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>
        <a class='dropdown-item' href='#'>
          Action
        </a>
        <a class='dropdown-item' href='#'>
          Another action
        </a>
        <a class='dropdown-item' href='#'>
          Something else here
        </a>
      </div>
    </div>
  )
}
