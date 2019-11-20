import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import UserContext from '../UserInfo'

export default class Note extends React.Component {
  static contextType = UserContext
  
  
  DeleteItem(noteId) {
    fetch(`http://localhost:9090/note/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if(response.ok){
        return response.json();
      }
      else{
        return {}
      }
    })
    console.log(this.context)
  }

  // handleDeleteItem () {
    
  // }

  
  
  render() {
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={() => this.DeleteItem(this.props.id)} >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
      </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
          {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
