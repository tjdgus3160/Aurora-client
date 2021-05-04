import { Button, Card, Popover, List, Comment } from 'antd'
import { HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons'

import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import PostImages from './PostImages'
import Thema from '../../Thema'
import CommentForm from './CommentForm'
import { removePost } from '../../../reducers/post'
import PostCardContent from './PostCardContent'

const PostCard = ({ post, onClick }) => {
  const dispatch = useDispatch()
  // 옵셔널체이닝 id or undefined
  const id = useSelector(state => state.user.me?.id)

  // 포스트 수정
  const [editMode, setEditMode] = useState(false)
  const onClickUpdate = useCallback(() => {
    setEditMode(true)
  }, [])
  const onCancelUpdate = useCallback(() => {
    setEditMode(false)
  }, [])
  const onChangePost = useCallback((editText) => () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: editText
      }
    })
  }, [post])

  // 포스트 삭제
  const onRemovePost = () => {
    dispatch(removePost(post._id))
  }

  // 좋아요 기능
  const [liked, setLiked] = useState(false)
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev)
  }, [])

  // 댓글 기능
  const [commentFormOpened, setCommentFormOpened] = useState(false)
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev)
  }, [])

  console.log('post.mood : ', post.mood)

  return (
    <Wrapper ThemaColor={Thema[post.mood].color}>
      <Header>
        <Auth>
          {/* <img src={post.User.avatar} /> */}
          <div>
            {/* <span>{post.User.username}</span> */}
            <span>TEST1</span>
            <span>22 minutes ago</span>
          </div>
        </Auth>
        {Thema[post.mood].icon}
      </Header>
      {/* <Body>
        <span>{post.content}</span>
      </Body> */}
      <Footer>
        <Card
          cover={<PostImages images={post.images} />}
          actions={[
            liked
              ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onToggleLike} />
              : <HeartOutlined key='heart' onClick={onToggleLike} />,
            <MessageOutlined key='comment' onClick={onToggleComment} />,

            // post.User.id === id && (
            (
              <Popover
                key='more' content={(
                  <Button.Group>
                    <Button onClick={onClickUpdate}>수정</Button>
                    <Button type='danger' onClick={onRemovePost}>삭제</Button>
                  </Button.Group>
                )}
              >
                <EllipsisOutlined />
              </Popover>
            )
          ]}
        >
          {editMode
            ? (
              <Card.Meta
                description={<PostCardContent editMode={editMode} postData={post.content} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} />}
              />
            )
            : (
              <Card.Meta
                description={<PostCardContent postData={post.content} />}
              />
            )}
          {/* {post.RetweetId && post.Retweet
            ? (
              <Card
                cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
              >
                <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                  avatar={(
                    <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                      <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  title={post.Retweet.User.nickname}
                  description={<PostCardContent postData={post.Retweet.content} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} />}
                />
              </Card>
              )
            : (
              <>
                <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                  avatar={(
                    <Link href={`/user/${post.User.id}`} prefetch={false}>
                      <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  title={post.User.nickname}
                  description={<PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} postData={post.content} />}
                />
              </>
              )} */}
        </Card>
      </Footer>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.comments.length} 개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.username}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80%;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  margin-bottom : 1rem;
  box-shadow: 0 0 3px ${props => props.ThemaColor};
`

const Header = styled.div`
  height: 4rem;
  display : flex;
  align-items: center;
  padding : 1rem 1.5rem;
  box-sizing: border-box;
  justify-content: space-between;
  i{
    font-size: 1.5rem
  }
`

const Body = styled.div`
  padding : 1rem 1.5rem;
  box-sizing: border-box;
  span{
    display : block;
    margin-bottom: 1rem;
  }
  img {
    width: 20rem;
    height: 20rem;
  }
`

const Footer = styled.div`
  
`

const Auth = styled.div`
  display : flex;
  color : gray;
  img{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
  div{
    margin-left : 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  span:first-child{
    color : black;
    font-weight: bold;
  }
`

export default PostCard