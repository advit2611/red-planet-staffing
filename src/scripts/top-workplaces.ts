async function getTopThree() {
  try {
    const workplacesResponse = await fetch("http://localhost:3000/workplaces");
    const shiftsResponse = await fetch("http://localhost:3000/shifts");

    if (!workplacesResponse.ok) {
      throw new Error("Failed to fetch data from APIs");
    }
    const workplaces = await workplacesResponse.json();
    const shifts = await shiftsResponse.json();

    const activeWorkplaces = workplaces.data.filter(
      (workplace: any) => workplace.status === 0
    );

    let currShifts: any = shifts;
    let allShifts: any = { data: currShifts.data };
    while (Object.keys(currShifts.links).length != 0) {
      let nextListOfShiftsResponse = await fetch(`${currShifts.links.next}`);
      let nextListOfShifts = await nextListOfShiftsResponse.json();
      allShifts.data = [...currShifts.data, ...nextListOfShifts.data];
      currShifts = nextListOfShifts;
    }

    const combinedWorplaceAndShifts = activeWorkplaces.map((workplace: any) => {
      // Find shifts that match the current worker's id
      const workerShifts = allShifts.data.filter(
        (shift: any) => shift.workplaceId === workplace.id
      );

      // Combine worker info with their associated shifts
      return {
        ...workplace,
        shifts: workerShifts,
      };
    });
    

    // Count and Sort based on number of Shifts
    const topWorkplaces = combinedWorplaceAndShifts
      .map((workplace: any) => ({
        ...workplace,
        shiftCount: workplace.shifts.length,
      }))
      .sort((a: any, b: any) => b.shiftCount - a.shiftCount)
      .slice(0, 3);

    console.log(JSON.stringify(topWorkplaces, null, 2));
  } catch (error) {
    console.error("Error fetching top active workplaces:", error);
  }
}

getTopThree();
