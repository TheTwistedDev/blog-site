import Link from 'next/link';
import { formatDate } from '../lib/utils';

const Card = props => (
  <Link
    key={props.id}
    href={
      props.published
        ? `/posts/${encodeURIComponent(props.slug)}`
        : `/drafts/${props.id}`
    }
  >
    <a className="flex flex-col p-6 transition-shadow border rounded-md w-fit dark:border-gray-700 dark:bg-gray-800 hover:shadow-xl">
      <h3 className="mb-2 text-3xl font-bold leading-snug tracking-tight truncate">
        {props?.title || 'Untitled'}
      </h3>
      {props?.author ? (
        <div className="flex items-center mb-4 space-x-2">
          <img
            src={props.author?.image}
            alt={props.author?.name}
            className="w-12 h-12 border-2 border-blue-600 rounded-full"
          />
          <div className="text-sm">
            <p className="font-bold">{props.author?.name}</p>
            <p className="text-gray-500">
              {props.published
                ? `Published on ${formatDate(props.published_at)}`
                : `Updated on ${formatDate(props.updated_at)}`}
            </p>
          </div>
        </div>
      ) : null}
      <p className="text-gray-500">
        {props?.content?.slice(0, 250) || 'Nothing to preview...'}
      </p>
    </a>
  </Link>
);

export default Card;