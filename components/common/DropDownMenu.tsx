import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import api from '../../api';
import { useModal } from '../../contexts/ModalContext';
import ConfirmModal from './ConfirmModal';

export const DropdownMenu = ({
  isCommentBtn,
  onDelete,
  onEdit,
  commentId,
  postId,
  postType,
}) => {
  const router = useRouter();
  const modal = useModal();
  const queryClient = useQueryClient();

  // 상품 삭제
  const { mutate: removeProduct } = useMutation({
    mutationFn: () => api.deleteProduct(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push('/products');
    },
  });
  const deleteProduct = async () => {
    modal.open(
      <ConfirmModal
        confirmMessage={'삭제하시겠습니까?'}
        onClickConfirm={removeProduct}
      />
    );
  };
  // 게시글 삭제
  const { mutate: removeArticle } = useMutation({
    mutationFn: () => api.deleteArticle(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/articles');
    },
  });
  const deleteArticle = async () => {
    modal.open(
      <ConfirmModal
        confirmMessage={'삭제하시겠습니까?'}
        onClickConfirm={removeArticle}
      />
    );
  };
  // 상품 수정
  const editProduct = () => {
    router.push(`/products/post/${postId}`);
  };
  // 게시글 수정
  const editArticle = () => {
    router.push(`/articles/post/${postId}`);
  };
  // 댓글 삭제
  const deleteComment = () => {
    modal.open(
      <ConfirmModal
        confirmMessage={'삭제하시겠습니까?'}
        onClickConfirm={() => onDelete(commentId)}
      />
    );
  };
  // 댓글 수정
  const editComment = () => {
    onEdit(true);
  };
  const MENU_ITEMS = [
    {
      text: '수정하기',
      clickMethod: isCommentBtn
        ? editComment
        : postType === 'articles'
        ? editArticle
        : editProduct,
    },
    {
      text: '삭제하기',
      clickMethod: isCommentBtn
        ? deleteComment
        : postType === 'articles'
        ? deleteArticle
        : deleteProduct,
    },
  ];

  return (
    <div className="absolute top-5 right-0 mt-2 w-[130px] font-normal text-[#6B7280] text-center bg-white rounded-lg border">
      {MENU_ITEMS.map((menuItem, i) => (
        <div
          className="h-10 flex justify-center items-center cursor-pointer hover:bg-slate-100 transition"
          key={i}
          onClick={menuItem.clickMethod}
        >
          {menuItem.text}
        </div>
      ))}
    </div>
  );
};
