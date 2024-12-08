import React from 'react';
import "../Card.css"
  const Card = ({ image, title, description, destination}) => {
	  return(
		<div className="card">
			<div className="card-image-container">
				<img src={image} alt={title} className="card-image"/>
			</div>
			<div className="card-content">
				<h2 className="card-title">{title}</h2>
				<p className="card-description">{description}</p>
				<a href={destination}>
					{title}
				</a>
			</div>
		</div>
	  );
  };
export default Card;