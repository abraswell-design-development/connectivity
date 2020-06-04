import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@apollo/react-hooks'
import { Confirm } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'
import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION } from '../../graphql.js/mutations'
import Tooltip from '../Tooltip/Tooltip'

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(true);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })
        data.getPosts = data.getPosts.filter((p) => p.id !== postId)
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
      }
      if (callback) callback()
    },
    variables: {
      postId,
      commentId
    }
  })
  return (
    <>
      <Tooltip left= "-20px"  message={commentId ? 'Delete comment' : 'Delete post'}>
        <button
          className='Button--delete'
          type='button'
          onClick={() => setConfirmOpen(true)}
        >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
        </button>
        </Tooltip>


      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}


export default DeleteButton