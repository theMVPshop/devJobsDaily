import chart from './fakeChart.png';

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
     <img src={chart} 
     className="chart" alt="trendline"/>

    </section>
   );
}
 
export default Bx2 ;