import React from 'react'
import "./home.scss";

// components
import CategoryCard from './category_card.jsx'

const data = [
  {
    title: "日式料理",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921811.svg",
  },
  {
    title: "韓式料理",
    image: "https://www.flaticon.com/svg/static/icons/svg/2511/2511138.svg",
  },
  {
    title: "速食",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921822.svg",
  },

  {
    title: "飲料",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921819.svg",
  },
  {
    title: "甜點",
    image: "https://www.flaticon.com/svg/static/icons/svg/1997/1997775.svg",
  },
  {
    title: "蔬食",
    image: "https://www.flaticon.com/svg/static/icons/svg/1998/1998095.svg",
  },
];

function CategoryCardList(){
  return(
    <div className="category-card-list">
      {
        data.map((item) => {
          return(
            <CategoryCard 
              {...item}
              key={item.id}
            />
          )
        })
      }
    </div>
  );
}

export default CategoryCardList;