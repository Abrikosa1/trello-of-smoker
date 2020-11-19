import React, {useState} from 'react';
import {Comment, List, Task} from '../../store/types';
import {BsChatFill} from "react-icons/bs";
import {useDispatch} from 'react-redux';
import {deleteTaskComment, editTaskComment} from '../../store/listsData/actionCreators';

import './commentComponent.css';

interface IProps {
    comment : Comment;
    task : Task;
    list : List;
    username : string;
}

const CommentComponent : React.FC < IProps > = ({comment, username}) => {
    const dispatch = useDispatch();
    const author = username;
    const date : Date = new Date(comment.createTime);
    const month = date.toLocaleString('en-en', {month: 'short'});
    const day = date.getDate();
    const time = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    /* Delete comment */
    const handleClickDeleteComment = (e : React.MouseEvent < HTMLSpanElement >) => {
        dispatch((deleteTaskComment(comment.id)));
    };

    /* Edit comment */
    const [edit,
        setEdit] = useState(false);
    const [editedComment,
        setEditedComment] = useState(comment.text);

    const handleEditComment = (e : React.MouseEvent < HTMLButtonElement >) => {
        setEdit(!edit);
    };

    const hancleClickEditComment = (e : React.MouseEvent < HTMLSpanElement >) => {
        setEdit(true);
    };

    const handleCommentChange = (e : React.ChangeEvent < HTMLTextAreaElement >) => {
        setEditedComment(e.target.value);
    }

    const hancleSubmitEditComment = (e : React.MouseEvent < HTMLSpanElement >) => {
        dispatch((editTaskComment(comment.id, editedComment)));
        setEdit(false);
    };

    // Для автоматического увеличения высоты texarea
    const adjustTextArea = (e : any) => {
        e.target.style.height = '1px';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div key={comment.id} className="comment__wrapper">
            <div className="comment__header">
                <span className="comment__author">{comment.author}</span>
                <span className="comment__date">{month + ' ' + day + ' at ' + time}</span>
            </div>
            <div className="comment__body">
                <span className="comment__icon"><BsChatFill/></span>
                {!edit && <div className="comment__card">
                    <p className="comment__text">{comment.text}</p>
                </div>}
            </div>
            <div className="comment__footer">
                {((comment.author === author) && !edit) && <span className="comment__edit" onClick={hancleClickEditComment}>Edit</span>}
                <div
                    className={`task-description__edit ${ !edit
                    ? 'edit_closed'
                    : ''}`}>
                    <textarea
                        onKeyUp={adjustTextArea}
                        value={editedComment}
                        onChange={handleCommentChange}
                        className="description-edit__texarea card-description"
                        placeholder="Oh, have you changed your mind?"></textarea>
                    <div className="edit-controls">
                        <input
                            className=""
                            disabled={editedComment.length === 0}
                            type="submit"
                            value="Save"
                            onClick={hancleSubmitEditComment}/>
                        <span
                            className="edit-controls__cancel-icon icon-sm"
                            onClick={handleEditComment}>&#10006;</span>
                    </div>
                </div>
                {((comment.author === author) && !edit) && <span className="comment__edit" onClick={handleClickDeleteComment}>Deliete</span>}
            </div>
        </div>
    );
}

export default CommentComponent;