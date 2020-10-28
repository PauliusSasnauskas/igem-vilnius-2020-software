"""
Amazing software for amazing people <3
"""

from __future__ import print_function
import matplotlib.pyplot as plt
# from vedo.dolfin import plot, ProgressBar
from vedo import *
import numpy as np
from dolfin import *
from mshr import *
# print(__doc__)



def lfa_time_volume(xL1 = 0.0205,
                    A0 = 1e-8,
                    P0 = 1e-8,
                    R0 = 1e-8,
                    D_A = 1e-10,
                    D_P = 1e-12,
                    ka1 = 1e6,
                    kd1 = 1e-3,
                    ka2 = 1e6,
                    kd2 = 1e-3,
                    ka3 = 1e6,
                    kd3 = 1e-3,
                    ka4 = 1e6,
                    kd4 = 1e-3):
    xL1 = xL1
    # Time stepping
    T = 1200.0            # final time
    num_steps = 600    # number of time steps 500
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


    L = 0.041      # juostelės ilgis
    #xL1 = L/2      # R ribos
    #xL2 = 3*L/4    # R ribos
    xL2 = xL1+0.004

    #xL1 = 0.034276
    #xL2 = 0.034276 + 0.003

    RPA_signal = 0.8 * R0
    thickness = 0.000135
    velocity = 2e-4


    #xL1 = 0.034276
    #xL2 = xL1 + 0.005


    # Create mesh
    domain = Rectangle(Point(0, 0), Point(L, 0.006))  # 2.2, 0.41
    # išsiaiškinti kaip veikia mesh funkcija (ar x ir y kryptimis same)
    mesh = generate_mesh(domain, 32)


    # Define function space for system of concentrations
    P1 = FiniteElement("P", triangle, 2)
    #element = MixedElement([P1, P1, P1, P1, P1, P1])
    element = MixedElement([P1, P1, P1, P1, P1, P1])
    V = FunctionSpace(mesh, element)


    # Define boundary condition
    #u_D = Expression('1 + x[0]*x[0] + 2*x[1]*x[1]', degree=2)


    # Define test functions
    v_A, v_PA, v_P, v_R, v_RA, v_RPA = TestFunctions(V)
    #v_A, v_PA, v_P, v_RA, v_RPA, v_R = TestFunctions(V)


    # Define functions for concentrations

    # Define initial conditions
    u_0 = Expression(('0', '0', '0', 'x[0]>xL1 && x[0]<xL2 ? R0 : 0',
                    '0', '0'), degree=0, R0=R0, xL1=xL1, xL2=xL2)

    #u_0 = Expression(('0', '0', '0'), degree=0)

    u = Function(V)
    u_n = project(u_0, V)
    #u_n = Function(V)


    # Split system functions to access components

    u_A, u_PA, u_P, u_R, u_RA, u_RPA = split(u)
    u_nA, u_nPA, u_nP, u_nR, u_nRA, u_nRPA = split(u_n)


    # Define expressions used in variational forms
    k = Constant(dt)

    A0 = Constant(A0)
    P0 = Constant(P0)
    R0 = Constant(R0)

    ka1 = Constant(ka1)
    kd1 = Constant(kd1)
    ka2 = Constant(ka2)
    kd2 = Constant(kd2)
    ka3 = Constant(ka3)
    kd3 = Constant(kd3)
    ka4 = Constant(ka4)
    kd4 = Constant(kd4)

    D_A = Constant(D_A)
    D_P = Constant(D_P)

    L = Constant(L)
    # fuild velocity, obtained from experimental data (m/s or ~0.2mm/s) 20s/4cm
    U = Constant((2e-4, 0))

    xL1 = Constant(xL1)
    xL2 = Constant(xL2)


    # Define boundray conditions

    u_D_A1 = Expression('(T-t)>0 ? A0 : 0', degree=0, t=0, T=1200, A0=A0)
    #u_D_PA1 = Expression('0', degree=0)
    u_D_P1 = Expression('(T-t)>0 ? P0 : 0', degree=0, t=0, T=1200, P0=P0)

    u_D_PA1 = Constant(0.0)

    inflow = 'near(x[0], 0)'  # boundary kai x = 0
    inflow_2 = 'x[0] < DOLFIN_EPS'


    bc_A1 = DirichletBC(V.sub(0), u_D_A1, inflow)
    bc_PA1 = DirichletBC(V.sub(1), u_D_PA1, inflow)
    bc_P1 = DirichletBC(V.sub(2), u_D_P1, inflow)

    bc_R1 = DirichletBC(V.sub(3), u_D_PA1, inflow)
    bc_RA1 = DirichletBC(V.sub(4), u_D_PA1, inflow)
    bc_RAP1 = DirichletBC(V.sub(5), u_D_PA1, inflow)


    # outflow = 'near(x[0], L)' # boundary kai x = 1, mum reikėtų kai x = L, reikės dar parametra įvesti L=L
    # boundary = 'near(x[0], 0)' # reikia funkcijos kuri paskytu ties kurio x ar y pasirenktu boundary
    # walls = 'near(x[1], 0) || near(x[1], 1)' # boundary kai y = 0 ir kai y = 1


    # Boundaries combined into a list
    bcs = [bc_A1, bc_P1, bc_PA1, bc_R1, bc_RA1, bc_RAP1]


    F_PA = ka1*u_A*u_P - kd1*u_PA


    F_RA = ka2*u_A*u_R - kd2*u_RA - ka4*u_RA*u_P + kd4*u_RPA
    F1_RPA = ka3*u_PA*u_R - kd3*u_RPA
    F2_RPA = ka4*u_RA*u_P - kd4*u_RPA
    F_RPA = F1_RPA+F2_RPA


    F = ((u_A - u_nA) / k)*v_A*dx + D_A*dot(grad(u_A), grad(v_A))*dx + dot(U, grad(u_A))*v_A*dx \
        + ((u_PA - u_nPA) / k)*v_PA*dx + D_P*dot(grad(u_PA), grad(v_PA))*dx + dot(U, grad(u_PA))*v_PA*dx \
        + ((u_P - u_nP) / k)*v_P*dx + D_P*dot(grad(u_P), grad(v_P))*dx + dot(U, grad(u_P))*v_P*dx \
        + ((u_R - u_nR) / k)*v_R*dx \
        + ((u_RA - u_nRA) / k)*v_RA*dx \
        + ((u_RPA - u_nRPA) / k)*v_RPA*dx \
        - (-F_PA*v_A*dx - F_RA*v_A*dx
        + F_PA*v_PA*dx - F1_RPA*v_PA*dx
        - F_PA*v_P*dx - F2_RPA*v_P*dx
        - F_RA*v_R*dx - F1_RPA*v_R*dx
        + F_RA*v_RA*dx
        + F_RPA*v_RPA*dx)


    # Create VTK files for visualization output
    #vtkfile_u_A = File('lfa_time_volume/u_A.pvd')
    #vtkfile_u_PA = File('lfa_time_volume/u_PA.pvd')
    #vtkfile_u_P = File('lfa_time_volume/u_P.pvd')
    #vtkfile_u_R = File('lfa_time_volume/u_R.pvd')
    #vtkfile_u_RA = File('lfa_time_volume/u_RA.pvd')
    #vtkfile_u_RPA = File('lfa_time_volume/u_RPA.pvd')


    # Create progress bar
    #progress = Progress('Time-stepping', num_steps)
    pb = ProgressBar(0, num_steps, c='red')
    # set_log_level(PROGRESS)

    # Time-stepping
    t = 0
    # for n in range(num_steps):


    #average_concentrations = []


    for n in pb.range():

        # Update boundaries
        u_D_A1.t = t
        #u_D_PA1.t = t
        u_D_P1.t = t

        # Update current time
        t += dt

        #vtkfile_u_A = File('lfa_time_volume/u_A.pvd')
        #vtkfile_u_PA = File('lfa_time_volume/u_PA.pvd')
        #vtkfile_u_P = File('lfa_time_volume/u_P.pvd')
        #vtkfile_u_R = File('lfa_time_volume/u_R.pvd')
        #vtkfile_u_RA = File('lfa_time_volume/u_RA.pvd')
        vtkfile_u_RPA = File('lfa_time_volume/u_RPA.pvd')

        # Solve variational problem for time step
        solve(F == 0, u, bcs, solver_parameters={"newton_solver": {
            "absolute_tolerance": 1e-20, "relative_tolerance": 1e-20}})

        # Save solution to file (VTK)
        #_u_A, _u_PA, _u_P, _u_RA, _u_RPA, _u_R = u.split()
        _u_A, _u_PA, _u_P, _u_R, _u_RA, _u_RPA = u.split()
        #vtkfile_u_A << (_u_A, t)
        #vtkfile_u_PA << (_u_PA, t)
        #vtkfile_u_P << (_u_P, t)
        #vtkfile_u_R << (_u_R, t)
        #vtkfile_u_RA << (_u_RA, t)
        vtkfile_u_RPA << (_u_RPA, t)

        # Update previous solution
        u_n.assign(u)

        img = load("lfa_time_volume/u_RPA000000.vtu")
        p1, p2 = (xL1, 0.003, 0), (xL2, 0.003, 0)
        pl = probeLine(img, p1, p2, res=500).lineWidth(4)
        xvals = pl.points()[:, 0]
        yvals = pl.getPointArray()
        #average_concentration = sum(yvals) / len(yvals)
        # average_concentrations.append(average_concentration)
        max_concentration = max(yvals)
        volume = t*thickness*velocity*1000000

        print(max_concentration)
        print(t)
        print(volume)

        if max_concentration >= RPA_signal:
            print("hey hey hey, stop it!")
            #print(max_concentration)
            #print(t)
            #print(volume)
            return t,volume
            #x_opt = xvals[yvals.argmax()]
            # print(x_opt)
            #break

        # pb.print(t)
    #plot()
    return 0, 0

    # Update progress bar
    #Progress('Time-stepping', t / T)
    # Progress('Time-stepping')
    # set_log_level(LogLevel.PROGRESS)
    # progress+=1
    # set_log_level(LogLevel.ERROR)

    # Hold plot
    # interactive()