import React from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { MdArrowForwardIos } from 'react-icons/md';

import StarRating from 'components/Common/StarRating';
import Button from 'components/Common/Button/Button';
import CustomIcon from 'components/Common/CustomIcon/CustomIcon';
import { ratingCalculator } from 'utils/helperFunctions/helperFunctions';
import { locationAccess, campgroundFacilities } from 'utils/configValues';
import missingImage from 'assets/image-not-found.jpg';
import style from 'components/CampCard/CampCard.module.scss';

const CampCard = ({ campground, url }) => {
    const { image, name, price, country, landscape, access, facilities, description } = campground.campground;
    const overAllRating = ratingCalculator(campground.ratings);
    const currentCampAccess = access && locationAccess.filter(item => access.includes(item.name));
    const currentCampFacilities = facilities && campgroundFacilities.filter(item => facilities.includes(item.name));
    const displayFacilities = currentCampFacilities.slice(0, 4);
    const displayDescriprtion = description.length > 100 ? `${description.substring(0, 100)}...` : description;
    const displayPrice = price > 0 ? `Price from ${price} €` : 'Free Accomodation';

    const btnColors = {
        "mountain campsite": "primary",
        "beach campsite": "secondary",
        "countryside campsite": "third",
        "mountain hut": "primary",
        "mountain refuge": "primary",
    };

    const {
        card, 
        card_cover, 
        card_cover_image, 
        card_cover_info, 
        card_cover_info_text,
        card_details, 
        card_details_title, 
        card_details_access, 
        card_details_access_icons, 
        card_details_description,
        card_details_description_text,
        card_details_footer,       
        card_details_footer_icons, 
    } = style;

    return ( 
        <div className={card}>
            <figure className={card_cover}>
                <img className={card_cover_image} src={image.length ? image[0].url : missingImage} alt="card cover" />
                <div className={card_cover_info}>
                    {landscape && <h3 className={card_cover_info_text}>{landscape}</h3>}
                    {overAllRating > 0 && <StarRating readOnly={true} ratingValue={overAllRating}/>}
                </div>
            </figure>
            <div className={card_details}>
                <h1 className={card_details_title}>{name}</h1>
                <div className={card_details_access}>
                    <div className={card_details_access_icons}>
                        {currentCampAccess?.map((item, index) => (
                            <CustomIcon key={index} icon={<item.icon/>}/>
                        ))}
                    </div>

                    {country &&
                        <ReactCountryFlag 
                        countryCode={country.code} 
                        svg 
                        style={{
                            fontSize: '1.5em',
                        }}
                        title={country.name}
                        />
                    }
                </div>
                <div className={card_details_description}>
                    <p className={card_details_description_text}>{displayDescriprtion}</p>
                </div>
                <Button label={displayPrice} variant="outlined" color={btnColors[landscape]}/>

                <div className={card_details_footer}>
                    <div className={card_details_footer_icons}>
                        {displayFacilities.map((item, index) => (
                            <CustomIcon key={index} icon={<item.icon/>}/>
                        ))}
                    </div>
                    <Link to={`${url}/${campground.id}`}>
                        <Button label={"Full Info"} variant="basic" rightIcon={<MdArrowForwardIos/>} />
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default CampCard;