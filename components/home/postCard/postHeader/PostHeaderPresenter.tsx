import React from 'react';
import { IPost } from '../../../../interfaces/data/post';
import Avatar from '../../../common/Avatar';
import { IconCloud, IconMoon, IconRain, IconSun } from '../../../common/Icon';
import { Wrapper } from './style';

type Props = {
    post: IPost;
};

const PostHeaderPresenter = ({ post }: Props) => (
    <Wrapper>
        <Avatar size={44} url={post.auth.avatar} />
        <div className="info">
            <span>{post.auth.name}</span>
            <span>22 mins ago</span>
        </div>
        {post.mood === 'sun' && <IconSun />}
        {post.mood === 'cloud' && <IconCloud />}
        {post.mood === 'rain' && <IconRain />}
        {post.mood === 'moon' && <IconMoon />}
    </Wrapper>
);

export default PostHeaderPresenter;
