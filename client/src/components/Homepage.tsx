import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


const Homepage = () => {

    const { user, logout, isLoading, role } = useAuth();
    
    if (!user) {
        return (
          <div className="flex">

  {/* Main content */}
  <div className="flex-1 flex flex-col p-10 items-center bg-blend-darken">
    {/* Content */}
    <div>Loading...</div>

    {/* Table */}
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-between">
              <div>
                <div>Amount</div>
                <div>$250.00</div>
              </div>
              <div className="ml-4">
                <Button className="hover:bg-red-700" variant="outline">
                  Delete
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-yellow-600">
                  Edit
                </Button>
                <Button variant="outline" className="ml-2 hover:bg-green-600">
                  Okay
                </Button>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</div>

        ); 
    }
    
    return (
      <div>
        {user && (
          <div>
            Welcome, {user}
            <Button onClick={logout}>Logout</Button>
          </div>
        )}
        
      </div>
    );
}

export default Homepage