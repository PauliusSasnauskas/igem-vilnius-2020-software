from __future__ import print_function
import matplotlib.pyplot as plt
from vedo.dolfin import plot, ProgressBar
from vedo import *
import numpy as np
from dolfin import *
from mshr import *


# analyte conc should be lower than gold nano particles
# put as further as u can to obtain best sygnal
# recomendation of A0 is smaller 10 times than P0

# if A is less than P - could happen anything
# if A much bigger than P test line jis very close to the beggingin

#simuliacja susidaužo jei lygios koncentracijos

# jei didziule konc siulys deti labai labai arti kas nera optimalu todel geriau konc mazinti
set_log_level(40)
debug = False

def lfa_test_line_location(A0 = 25e-9, #1.3e-8
                           P0 = 11.4e-9, #2.28e-8
                           D_A = 2.6073971259391082e-11, #1e-10
                           D_P = 1.507422684843226e-11, #1e-12,
                           D_PA = 1.1843944324646026e-11,
                           ka1 = 1e6,
                           kd1 = 1e-3,
                           U = 2.22e-4,
                           T = 1800,
                           num_steps = 600,
                           L = 0.025,
                           C = 0.000183,
                           r = 0.00855,
                           width = 0.006, # meters
                           PA_coef = 0.8):


    # Time stepping
    #T = 1800.0           # final time
    #num_steps = 1800     # number of time steps 500
    dt = T / num_steps  # time step size

    # System parameters, constants

    # concentration of analite on the sample pad (or chamber)
    # concentration of detection probe on the sample pad (or chamber)
    
    # total ligand concentration


         # analyte diffusion coeficient from Stokes–Einstein equation
         # probe diffusion coeficient from Stokes–Einstein equation


         # association rate (1/Ms)
         # dissociation rate (1/Ms)
         # association rate (1/Ms)
         # dissociation rate (1/Ms)
         # association rate (1/Ms)
         # dissociation rate (1/Ms)
         # association rate (1/Ms)
         # dissociation rate (1/Ms)


    #L = 0.041      # juostelės ilgis



    def quadratic(opt):
        a = ka1
        b = -(ka1*A0 + ka1*P0 + kd1)
        c = ka1*A0*P0
        D = b**2 - 4*a*c
        #opt = 0.90

        PA1 = (-b + sqrt(D)) / (2*a)
        PA2 = (-b - sqrt(D)) / (2*a)

        if (PA1 and PA2) < (A0 or P0):
            if PA1 > PA2:
                return PA2*opt
            else:
                return PA1*opt
        else:
            print("Critical error")
            return 0


    PA_eq = quadratic(PA_coef)
    max_PA = 0
    x_opt = 0


    # Create mesh
    domain = Rectangle(Point(0, 0), Point(L, 0.006))  # 2.2, 0.41
    # išsiaiškinti kaip veikia mesh funkcija (ar x ir y kryptimis same)
    mesh = generate_mesh(domain, 32)


    # Define function space for system of concentrations
    P1 = FiniteElement("P", triangle, 2)
    #element = MixedElement([P1, P1, P1, P1, P1, P1])
    element = MixedElement([P1, P1, P1])
    V = FunctionSpace(mesh, element)


    # Define test functions
    v_A, v_PA, v_P = TestFunctions(V)

    # Define initial conditions
    u_0 = Expression(('0', '0', '0'), degree=0)


    u = Function(V)
    u_n = project(u_0, V)
    #u_n = Function(V)


    u_A, u_PA, u_P = split(u)
    u_nA, u_nPA, u_nP = split(u_n)


    # Define expressions used in variational forms
    k = Constant(dt)


    A0 = Constant(A0)
    P0 = Constant(P0)

    ka1 = Constant(ka1)
    kd1 = Constant(kd1)

    D_A = Constant(D_A)
    D_P = Constant(D_P)


    L = Constant(L)
    # 2e-4 fuild velocity, obtained from experimental data (m/s or ~0.2mm/s) 20s/4cm
    U = Constant((U, 0))

    C = Constant(C)
    r = Constant(r)

    U = Expression(('C*exp(-r*t)', '0'), degree=2, C=C, r=r, t=0)


    # Define boundray conditions

    u_D_A1 = Expression('(T-t)>0 ? A0 : 0', degree=0, t=0, T=T, A0=A0)
    #u_D_PA1 = Expression('0', degree=0)
    u_D_P1 = Expression('(T-t)>0 ? P0 : 0', degree=0, t=0, T=T, P0=P0)

    #u_D_A1 = Expression('A0', degree=0, A0=A0)
    #u_D_PA1 = Expression('3e-16', degree=0)
    #u_D_P1 = Expression('P0', degree=0, P0=P0)

    u_D_PA1 = Constant(0.0)

    inflow = 'near(x[0], 0)'  # boundary kai x = 0
    inflow_2 = 'x[0] < DOLFIN_EPS'


    bc_A1 = DirichletBC(V.sub(0), u_D_A1, inflow)
    bc_PA1 = DirichletBC(V.sub(1), u_D_PA1, inflow)
    bc_P1 = DirichletBC(V.sub(2), u_D_P1, inflow)


    # i lista reikia boundary apjungti
    bcs = [bc_A1, bc_P1, bc_PA1]
    #bcs = [bc_A1, bc_P1]

    F_PA = ka1*u_A*u_P - kd1*u_PA


    F = ((u_A - u_nA) / k)*v_A*dx + D_A*dot(grad(u_A), grad(v_A))*dx + dot(U, grad(u_A))*v_A*dx \
        + ((u_PA - u_nPA) / k)*v_PA*dx + D_PA*dot(grad(u_PA), grad(v_PA))*dx + dot(U, grad(u_PA))*v_PA*dx \
        + ((u_P - u_nP) / k)*v_P*dx + D_P*dot(grad(u_P), grad(v_P))*dx + dot(U, grad(u_P))*v_P*dx \
        - (-F_PA*v_A*dx + F_PA*v_PA*dx - F_PA*v_P*dx)


    # Create VTK files for visualization output
    #vtkfile_u_A = File('lfa_diffusion_reduction/u_A.pvd')
    #vtkfile_u_PA = File('lfa_diffusion_reduction/u_PA.pvd')
    #vtkfile_u_P = File('lfa_diffusion_reduction/u_P.pvd')


    # Create progress bar
    #progress = Progress('Time-stepping', num_steps)
    pb = ProgressBar(0, num_steps, c='red')
    # set_log_level(PROGRESS)

    # Time-stepping
    t = 0
    # for n in range(num_steps):

    for n in pb.range():

        print(str(round(t/T*100, 1)) + "%")
        # Update boundaries
        u_D_A1.t = t
        u_D_P1.t = t
        U.t = t

        # Update current time
        t += dt

        vtkfile_u_PA = File('lfa_diffusion_reduction/u_PA.pvd')

        # Solve variational problem for time step
        solve(F == 0, u, bcs, solver_parameters={"newton_solver": {
            "absolute_tolerance": 1e-20, "relative_tolerance": 1e-20}})

        # Save solution to file (VTK)
        #_u_A, _u_PA, _u_P, _u_RA, _u_RPA, _u_R = u.split()
        _u_A, _u_PA, _u_P = u.split()
        #vtkfile_u_A << (_u_A, t)
        vtkfile_u_PA << (_u_PA, t)
        #vtkfile_u_P << (_u_P, t)

        # Update previous solution
        u_n.assign(u)

        img = load("lfa_diffusion_reduction/u_PA000000.vtu")
        p1, p2 = (0, 0.003, 0), (L, 0.003, 0)
        pl = probeLine(img, p1, p2, res=5000).lineWidth(4)
        xvals = pl.points()[:, 0]
        yvals = pl.getPointArray()
        max_PA = max(yvals)
        if debug:
            print(PA_eq)
            print(max_PA)
            print("")

        if max_PA >= PA_eq:
            print("PA complex concentration reached equilibrium, terminating simulation.")
            x_opt = xvals[yvals.argmax()]
            #x_opt
            return x_opt
            #break

            # Plot solution
    #    plot(_u_PA, at=0,  # draw on renderer nr.0
    #        shape=(1,1), # two rows, one column
    #        size='fullscreen',
    #        scalarbar='h',
    #        vmin = 0,
    #        vmax = 1e-8,
    #        zoom=2,
    #        lw=0,
    #        interactive=False)

        # pb.print(t)

    # plot()

        # Update progress bar
        #Progress('Time-stepping', t / T)
        # Progress('Time-stepping')
        # set_log_level(LogLevel.PROGRESS)
        # progress+=1
        # set_log_level(LogLevel.ERROR)

    # Hold plot
    # interactive()
if __name__ == '__main__':
    print(lfa_test_line_location(PA_coef=0.9))

# A0 = 1e-8, #1.3e-8
# P0 = 1e-8, #2.28e-8
# D_A = 1e-11, #1e-10
# D_P = 1e-11, #1e-12,
# D_PA = 1e-11,
# ka1 = 1e6,
# kd1 = 1e-3,
# U = 2e-4,
# T = 1800,
# num_steps = 600,
# L = 0.025,
# C = 0.000183,
# r = 0.00855,
# width = 0.006, # meters
# PA_coef = 0.8