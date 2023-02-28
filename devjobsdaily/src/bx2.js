// import chart from '../public/charts/mainchart.html';

import React, { Component }  from 'react';

const Bx2 = () => {
  return ( 
<section className="bx bx2">
<section className='drops'>
<label>Market:</label>
<select>
  <option value="USA">USA</option>
  <option value="DC">DC</option>
  <option value="Chicago">Chicago</option>
  <option value="LA">LA</option>
  <option value="Austin">Austin</option>
</select>
<label>Skill:</label>
<select>
  <option value="All">All</option>
  <option value="JavaScript">JavaScript</option>
  <option value="HTML">HTML</option>
  <option value="CSS">CSS</option>
  <option value="React">React</option>
</select>

<label>Experience:</label>
<select >
  <option value="All">All</option>
  <option value="Entry-Level">Entry-Level</option>
  <option value="Mid-Level">Mid-Level</option>
  <option value="Senior-Level">Senior-Level</option>
</select>
</section>
     {/* <!-- <div style="width: 500px;"><canvas id="dimensions"></canvas></div><br/> -->
     <div style="width: 800px;"><canvas id="acquisitions"></canvas></div>

     {/* <!-- <script type="module" src="dimensions.js"></script> --> */}
     {/* <script type="module" src="charts.js"></script> */}
    </section>
   );
}
 
export default Bx2 ;