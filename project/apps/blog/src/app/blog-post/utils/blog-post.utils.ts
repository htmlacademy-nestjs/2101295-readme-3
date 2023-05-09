import { Post, PostTypeEnum } from "@project/shared/app-types";
import { fillObject } from "@project/util/util-core";
import { PostLinkRdo, PostPhotoRdo, PostQuoteRdo, PostTextRdo, PostVideoRdo } from "../rdo/post.rdo";

export function fillRdoForPost(post: Post) {
  switch (post.type) {
    case PostTypeEnum.Text:
      return fillObject(PostTextRdo, post);
    case PostTypeEnum.Image:
      return fillObject(PostPhotoRdo, post);
    case PostTypeEnum.Video:
      return fillObject(PostVideoRdo, post);
    case PostTypeEnum.Link:
      return fillObject(PostLinkRdo, post);
    case PostTypeEnum.Quote:
      return fillObject(PostQuoteRdo, post);
  }
}
