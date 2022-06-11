import React, { memo, useState, useEffect } from 'react'
import { Paginaton } from '../../config/pagination';
const PaginationComponent = memo((props) => {
    const [buttons, setbuttons] = useState(null);
    const { data, drawRows } = props;
    const pageNumber = 5;
    useEffect(() => {
        generatePagination()
    }, [])
    function paginate(i) {
        let dato = i + 1;
        for (let j = 0; j < Math.ceil(data.length / pageNumber); j++) {
            document.getElementById(`ancla${j}`).classList.remove("active")
        }
        document.getElementById(`ancla${i}`).classList.add("active")
        drawRows(Paginaton(data, dato, pageNumber));
    }
    function generatePagination() {
        let rows = [];
        for (let i = 0; i < Math.ceil(data.length / pageNumber); i++) {
            rows.push(
                <li><a href="#" id={`ancla${i}`} className={i == 0 ? "active" : ""} onClick={() => {
                    paginate(i)
                }}>{i + 1}</a></li>
            )
        }
        setbuttons(rows)
    }
    return (
        <React.Fragment>
            <ul class="pagination">
                {buttons}
            </ul>
        </React.Fragment>
    )
})

export default PaginationComponent