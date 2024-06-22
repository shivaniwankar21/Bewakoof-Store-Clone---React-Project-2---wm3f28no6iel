export const HoverableComponent = () => {
  return (
    <>
      <h1>Hoverable Component </h1>
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
          <p>Link 1</p>
          <p>Link 2</p>
          <p>Link 3</p>
        </div>
      </div>

      <style>
        {`
        .dropbtn {
            backgroundColor: #04AA6D;
            color: white;
            padding: 16px;
            fontSize: 16px;
            border: none;
          }
          
          .dropdown {
            position: relative;
            display: inline-block;
          }
          
          .dropdown-content {
            display: none;
            position: absolute;
            backgroundColor: #f1f1f1;
            minWidth: 160px;
            boxShadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            zIndex: 1;
          }
          
          .dropdown-content a {
            color: black;
            padding: 12px 16px;
            textDecoration: none;
            display: block;
          }
          
          .dropdownContent a:hover {backgroundColor: #ddd;}
          
          .dropdown:hover .dropdownContent {display: block;}
          
          .dropdown:hover .dropbtn {backgroundColor: #3e8e41;}

        `}
      </style>
    </>
  );
};
