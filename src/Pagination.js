import React from 'react'

const Pagination = ({
  getNextPage,
  getPrevPage,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <>
      <button onClick={getPrevPage} disabled={isPrevDisabled}>
        Previous
      </button>
      <button onClick={getNextPage} disabled={isNextDisabled}>
        Next
      </button>
    </>
  )
}

export default Pagination
