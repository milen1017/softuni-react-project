import './Entry.css';
import { Link } from 'react-router-dom';
import { getDayAndMonth } from '../../utils';
import '@fortawesome/fontawesome-free/css/all.css';

const Entry = ({ title, summary, tags, cover, author, createdAt, _id }) => {
	const { day, month } = getDayAndMonth(createdAt);

	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-12'>
					<article className='blog-card'>
						<div className='blog-card__background'>
							<div className='card__background--wrapper'>
								<div
									className='card__background--main'
									style={{
										backgroundImage: `url(${cover})`,
									}}
								>
									<div className='card__background--layer'></div>
								</div>
							</div>
						</div>
						<div className='blog-card__head'>
							<span className='date__box'>
								<span className='date__day'>{day}</span>
								<span className='date__month'>{month}</span>
							</span>
						</div>
						<div className='blog-card__info'>
							<h2>{title}</h2>
							<p>
								<span className='icon-link mr-3'>
									<i className='fa fa-pencil-square-o'></i>post by{' '}
									{author?.username}
								</span>
								<span className='icon-link'>
									<i className='fa fa-comments-o'></i> 150
								</span>
							</p>
							<p>{summary}</p>
							<Link to={`/post/${_id}`} className='btn btn--with-icon'>
								<i className='btn-icon fa fa-long-arrow-right'></i>READ MORE
							</Link>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
};

export default Entry;
