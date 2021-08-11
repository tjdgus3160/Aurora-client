import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import AppLayout from '../components/layout/AppLayout';
import Loading from '../components/Loading';

import PostRegisterBar from '../components/home/postRegister/PostRegisterBar';
import {
    firstLoadAllPost,
    moreLoadAllPost,
    CHANGE_TIME,
    loadAllStatistics,
    loadLikePost,
    loadFirstPostsRequest,
    loadMorePostsRequest,
} from '../actions/post';
import PostRegisterModal from '../components/home/postRegister/PostRegisterModal';
import { RootState } from '../reducers';
import PostCard from '../components/home/postCard/PostCardt';
import { createSamplePosts } from '../util/sample';
import { loadProfileRequest } from '../actions/user';

const Home = () => {
    // const router = useRouter();

    const dispatch = useDispatch();
    // const { Time, Posts, firstLoadAllPostDone, filterWeather, totalPosts } = useSelector((state) => state.post);
    const { me } = useSelector((state: RootState) => state.user);
    const { Posts, loadMorePostsLoading } = useSelector((state: RootState) => state.post);
    const { isPostRegisterModalVisible } = useSelector((state: RootState) => state.modal);
    const [init, setInit] = useState(false);

    // let filterPosts = [];
    // if (filterWeather.length > 0) {
    //     filterPosts = Posts.filter((ele) => filterWeather.includes(ele.mood));
    // }

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         dispatch(firstLoadAllPost(Time, accessToken));
    //         dispatch(loadLikePost(accessToken));
    //     } else {
    //         router.push('/user/signin');
    //     }
    // }, [isLoggedIn]);

    useEffect(() => {
        dispatch(loadProfileRequest('token'));
        dispatch(loadFirstPostsRequest());
    }, [dispatch]);

    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (loadMorePostsLoading) return;
                dispatch(loadMorePostsRequest(1));
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [dispatch, loadMorePostsLoading]);

    return (
        <AppLayout title="Home" filter isMain>
            <PostRegisterBar />
            <PostCardList>
                {Posts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </PostCardList>
            {isPostRegisterModalVisible && <PostRegisterModal />}
        </AppLayout>
    );
};

const PostCardList = styled.section`
    /* border: 1px solid gray; */
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
    margin-top: 25px;
    overflow: visible;
    @media screen and (max-width: 768px) {
        margin-top: 100px;
    }
`;

export default Home;
